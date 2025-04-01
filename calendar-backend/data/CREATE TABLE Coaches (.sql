PRAGMA foreign_keys = ON;

CREATE TABLE Coaches (
    coachId INTEGER PRIMARY KEY AUTOINCREMENT,
    coachName TEXT NOT NULL,
    coachSurname TEXT NOT NULL
);

CREATE TABLE Organizations (
    organizationId INTEGER PRIMARY KEY AUTOINCREMENT,
    organizationName TEXT NOT NULL,
    organizationEmail TEXT,
    organizationPhone TEXT,
    preferredContact TEXT CHECK(preferredContact IN ('Phone', 'Email')),
    organizationAddress TEXT
);

CREATE TABLE Clients (
    clientId INTEGER PRIMARY KEY AUTOINCREMENT,
    organizationId INTEGER,
    clientName TEXT NOT NULL,
    clientSurname TEXT,
    ageGroup TEXT CHECK(ageGroup IN ('18-25', '26-35', '36-45', '46-55', '56+')),
    clientPhone TEXT,
    clientEmail TEXT,
    preferredContact TEXT CHECK(preferredContact IN ('Phone', 'Email')),
    clientLocation TEXT,
    clientDescription TEXT,
    gender TEXT CHECK(gender IN ('Female', 'Male', 'Other')),
    FOREIGN KEY (organizationId) REFERENCES Organizations(organizationId)
);

CREATE TABLE Events (
    eventId INTEGER PRIMARY KEY AUTOINCREMENT,  
    clientId INTEGER,
    coachId INTEGER,
    serviceId INTEGER,
    eventName TEXT NOT NULL,
    eventDescription TEXT,
    eventDate TEXT NOT NULL,
    startTime TEXT NOT NULL,
    endTime TEXT NOT NULL,
    attachments BLOB,
    attendance INTEGER DEFAULT 0 CHECK(attendance IN (0, 1)),
    eventLocation TEXT DEFAULT 'On site',
    FOREIGN KEY (clientId) REFERENCES Clients(clientId),
    FOREIGN KEY (coachId) REFERENCES Coaches(coachId),
    FOREIGN KEY (serviceId) REFERENCES Services(serviceId)
);
