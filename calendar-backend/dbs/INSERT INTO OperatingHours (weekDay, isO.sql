INSERT INTO OperatingHours (weekDay, isOpen, openTime, closeTime)
VALUES (0, 1, '8:00', '16:00'),
(1, 1, '8:00', '16:00'),
(2, 1, '8:00', '16:00'),
(3, 1, '8:00', '16:00'),
(4, 1, '8:00', '16:00'),
(5, 0, '8:00', '16:00'),
(6, 0, '8:00', '16:00');

INSERT INTO OperatingExceptions(exceptionDate, isOpen, exceptionDescription)
VALUES ('2025-05-01', 0, 'Premade');

INSERT INTO Services(serviceName, serviceDescription)
VALUES ('CV', 'Help with forging CV'),
('Job hunt', 'Job hunting consultation');