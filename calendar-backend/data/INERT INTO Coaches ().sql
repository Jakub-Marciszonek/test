INSERT INTO Coaches (coachName, coachSurname)
VALUES ('Jeff Premade', 'Jefferson'),
('Peter Premade', 'Peterson');

INSERT INTO Organizations (organizationName, organizationEmail, organizationPhone, preferredContact, organizationAddress)
VALUES ('Engineer Premade', 'Engineer@emial.com', '000 000 000', 'Phone', 'EngineerAdress');

INSERT INTO Clients (organizationId, clientName, clientSurname, ageGroup, clientPhone, clientEmail, preferredContact, clientLocation, clientDescription, gender)
VALUES (1, 'John', 'Smith', '26-35', '111 111 111', 'JohnSmith@emial.com', 'Email', 'JohnAdress', 'Premade 1', 'Male'),
(1, 'George', 'Tailor', '18-25', '222 222 222', 'GeorgeTailorh@emial.com', 'Phone', 'GeorgeAdress', 'Premade 2', 'Male');

INSERT INTO Events (clientId, coachId, serviceId, eventName, eventDescription, eventDate, startTime, endTime, eventLocation)
VALUES (1, 1, 1, 'CV with John', 'Premade 1', '2025-04-20', '10:00', '11:00', 'on site'),
(2,2,2, 'Job with George', 'Premade 2', '2025-04-25', '9:00', '11:00', 'on site');