INSERT INTO Roles (roleName)
VALUES ('Organization'),
('Admin'),
('Client'),
('Visitor'),
('Employee')

INSERT INTO Permissions (permissionName)
VALUES ('View'),
('Add Events'),
('Edit attendance'),
('Edit Events')

INSERT INTO RolePermission (roleId, permissionId)
VALUES (5, 2),
(5, 3),
(2, 2),
(2, 3),
(3, 2),
(4, 2),
(4, 3),
(4, 4)


INSERT INTO UserRole (userId, userType, roleId, assignmentTime)
VALUES (1, 'Coach', 2, '2025-04-10'),
(2, 'Coach', 2, '2025-04-10'),
(1, 'Organization', 5, '2025-05-01'),
(1, 'Client', 3, '2025-06-15'),
(2, 'Client', 3, '2025-06-15')
