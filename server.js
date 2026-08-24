// =========================================================
// AI INFINITE CYBER CITY
// Lightweight Game Server
// =========================================================

const http = require("http");
const fs = require("fs");
const path = require("path");


// =========================================================
// CONFIGURATION
// =========================================================

const PORT = 3000;

const CLIENT_FOLDER =
    path.join(
        __dirname,
        "client"
    );


// =========================================================
// MIME TYPES
// =========================================================

const MIME_TYPES = {

    ".html":
        "text/html; charset=utf-8",

    ".css":
        "text/css; charset=utf-8",

    ".js":
        "application/javascript; charset=utf-8",

    ".json":
        "application/json; charset=utf-8",

    ".png":
        "image/png",

    ".jpg":
        "image/jpeg",

    ".jpeg":
        "image/jpeg",

    ".svg":
        "image/svg+xml",

    ".ico":
        "image/x-icon"

};


// =========================================================
// SECURITY
// =========================================================

function getSafeFilePath(
    requestURL
) {

    let urlPath =
        requestURL.split("?")[0];

    try {

        urlPath =
            decodeURIComponent(
                urlPath
            );

    } catch {

        return null;

    }


    if (
        urlPath === "/" ||
        urlPath === ""
    ) {

        urlPath =
            "/index.html";

    }


    const normalizedPath =
        path.normalize(
            urlPath
                .replace(/^[/\\]+/, "")
        );


    const filePath =
        path.resolve(
            CLIENT_FOLDER,
            normalizedPath
        );


    const clientRoot =
        path.resolve(
            CLIENT_FOLDER
        );


    if (
        filePath !== clientRoot &&
        !filePath.startsWith(
            clientRoot +
            path.sep
        )
    ) {

        return null;

    }


    return filePath;

}


// =========================================================
// SEND FILE
// =========================================================

function sendFile(
    response,
    filePath
) {

    fs.stat(
        filePath,
        (
            statError,
            stats
        ) => {

            if (statError) {

                response.writeHead(
                    404,
                    {
                        "Content-Type":
                            "text/plain; charset=utf-8"
                    }
                );

                response.end(
                    "404 - File Not Found"
                );

                return;

            }


            if (!stats.isFile()) {

                response.writeHead(
                    404,
                    {
                        "Content-Type":
                            "text/plain; charset=utf-8"
                    }
                );

                response.end(
                    "404 - File Not Found"
                );

                return;

            }


            fs.readFile(
                filePath,
                (
                    readError,
                    data
                ) => {

                    if (readError) {

                        console.error(
                            "File read error:",
                            readError
                        );


                        response.writeHead(
                            500,
                            {
                                "Content-Type":
                                    "text/plain; charset=utf-8"
                            }
                        );

                        response.end(
                            "500 - Internal Server Error"
                        );

                        return;

                    }


                    const extension =
                        path.extname(
                            filePath
                        ).toLowerCase();


                    const contentType =
                        MIME_TYPES[
                            extension
                        ] ||
                        "application/octet-stream";


                    response.writeHead(
                        200,
                        {
                            "Content-Type":
                                contentType,

                            "Cache-Control":
                                "no-cache"
                        }
                    );


                    response.end(
                        data
                    );

                }
            );

        }
    );

}


// =========================================================
// HTTP SERVER
// =========================================================

const server =
    http.createServer(
        (
            request,
            response
        ) => {

            if (
                request.method !==
                    "GET" &&
                request.method !==
                    "HEAD"
            ) {

                response.writeHead(
                    405,
                    {
                        "Content-Type":
                            "text/plain; charset=utf-8"
                    }
                );

                response.end(
                    "405 - Method Not Allowed"
                );

                return;

            }


            const filePath =
                getSafeFilePath(
                    request.url
                );


            if (!filePath) {

                response.writeHead(
                    403,
                    {
                        "Content-Type":
                            "text/plain; charset=utf-8"
                    }
                );

                response.end(
                    "403 - Forbidden"
                );

                return;

            }


            if (
                request.method ===
                "HEAD"
            ) {

                fs.stat(
                    filePath,
                    (
                        error,
                        stats
                    ) => {

                        if (error) {

                            response.writeHead(
                                404
                            );

                            response.end();

                            return;

                        }


                        const extension =
                            path.extname(
                                filePath
                            ).toLowerCase();


                        const contentType =
                            MIME_TYPES[
                                extension
                            ] ||
                            "application/octet-stream";


                        response.writeHead(
                            200,
                            {
                                "Content-Type":
                                    contentType,

                                "Cache-Control":
                                    "no-cache",

                                "Content-Length":
                                    stats.size
                            }
                        );


                        response.end();

                    }
                );

                return;

            }


            sendFile(
                response,
                filePath
            );

        }
    );


// =========================================================
// START SERVER
// =========================================================

server.listen(
    PORT,
    () => {

        console.log("");
        console.log(
            "=========================================="
        );

        console.log(
            " AI INFINITE CYBER CITY"
        );

        console.log(
            " Lightweight Edition"
        );

        console.log(
            "=========================================="
        );

        console.log("");

        console.log(
            `Game URL: http://localhost:${PORT}`
        );

        console.log("");

        console.log(
            "Server started successfully."
        );

        console.log("");

    }
);


// =========================================================
// SERVER ERROR
// =========================================================

server.on(
    "error",
    (error) => {

        if (
            error.code ===
            "EADDRINUSE"
        ) {

            console.error(
                `Port ${PORT} is already in use.`
            );

            console.error(
                "Stop the other server and try again."
            );

        } else {

            console.error(
                "Server error:",
                error
            );

        }

    }
);


// =========================================================
// SHUTDOWN
// =========================================================

function shutdown() {

    console.log(
        "\nStopping server..."
    );


    server.close(
        () => {

            console.log(
                "Server stopped."
            );

            process.exit(
                0
            );

        }
    );

}


process.on(
    "SIGINT",
    shutdown
);


process.on(
    "SIGTERM",
    shutdown
);