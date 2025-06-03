PRAGMA foreign_keys = ON;

CREATE TABLE Roles (
    roleId INTEGER PRIMARY KEY AUTOINCREMENT,
    roleName TEXT UNIQUE NOT NULL
);

CREATE TABLE Permissions (
    permissionId INTEGER PRIMARY KEY AUTOINCREMENT,
    permissionName TEXT UNIQUE NOT NULL
);

CREATE TABLE RolePermission (
    roleId INTEGER,
    permissionId INTEGER,
    FOREIGN KEY (roleId) REFERENCES Roles(roleId),
    FOREIGN KEY (permissionId) REFERENCES Permissions(permissionId)
);

CREATE TABLE UserRole (
    userId INTEGER,
    userType TEXT NOT NULL CHECK (userType IN ('Client', 'Coach', 'Organization')),
    roleId INTEGER,
    assignmentTime TEXT,
    PRIMARY KEY (userId, userType),
    FOREIGN KEY (userId) REFERENCES Clients(clientId),
    FOREIGN KEY (userId) REFERENCES Organizations(organizationId),
    FOREIGN KEY (userId) REFERENCES Coach(coachId),
    
    FOREIGN KEY (roleId) REFERENCES Roles(roleId)
);