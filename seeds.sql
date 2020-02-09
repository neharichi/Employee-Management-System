-- departments data --
INSERT INTO department (name)
VALUES ("sales");

INSERT INTO department (name)
VALUES ("finance");

INSERT INTO department (name)
VALUES ("legal");

INSERT INTO department (name)
VALUES ("engineering");


-- roles data --
INSERT INTO roles (title, salary, department_id)
VALUES ("sales manager", 12000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("salesassociate", 18000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("lead engineer", 190000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("software engineer", 180000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("account manager", 170000, 5);

INSERT INTO roles (title, salary, department_id)
VALUES ("lawyer", 190000, 6);


-- employee data --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("bea", "doe", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("birdie", "chan", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("bowie", "singh", 3, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("gus", "allen", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("tom", "brown", 5, 5);