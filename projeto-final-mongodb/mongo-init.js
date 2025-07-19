db.createUser(
        {
            user: "melques",
            pwd: "12345",
            roles: [
                {
                    role: "readWrite",
                    db: "projeto4"
                }
            ]
        }
);
