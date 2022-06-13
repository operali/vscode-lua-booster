--Try define a table`s property while creating the table, not outside it.
-- bad
local user = {}
user.name = "Robin"
user.level = 56
user.grade = "gold"

-- good
local user = {
    name = "Robin",
    level = 56,
    grade = "gold"
}
