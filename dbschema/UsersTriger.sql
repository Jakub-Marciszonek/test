CREATE DEFINER = CURRENT_USER TRIGGER `CoollaCalendar`.`Users_AFTER_INSERT` AFTER INSERT ON `Users` FOR EACH ROW
BEGIN
  IF NEW.userType = 'Client' THEN
    INSERT INTO CoollaCalendar.Clients (clientId) VALUES (NEW.userId);
  ELSEIF NEW.userType = 'Coach' THEN
    INSERT INTO CoollaCalendar.Coaches (coachId) VALUES (NEW.userId); 
  ELSEIF NEW.userType = 'Organization' THEN
    INSERT INTO CoollaCalendar.Organizations (organizationsId) VALUES (NEW.userId);
END