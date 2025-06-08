CREATE TABLE OperatingHours (
    hoursId INTEGER PRIMARY KEY AUTOINCREMENT,
    weekDay INTEGER NOT NULL CHECK (weekDay BETWEEN 0 AND 6),
    isOpen INTEGER DEFAULT 0 CHECK (isOpen IN (0, 1)),
    openTime TEXT,
    closeTime TEXT
);

CREATE TABLE OperatingExceptions (
    exceptionId INTEGER PRIMARY KEY AUTOINCREMENT,
    exceptionDate TEXT NOT NULL,
    isOpen INTEGER DEFAULT 0 CHECK (isOpen IN (0, 1)),
    openTime TEXT DEFAULT '08:00',
    closeTime TEXT DEFAULT '16:00',
    exceptionDescription TEXT
);

CREATE TABLE Services (
    serviceId INTEGER PRIMARY KEY AUTOINCREMENT,
    serviceName TEXT UNIQUE NOT NULL,
    serviceDescription TEXT
);