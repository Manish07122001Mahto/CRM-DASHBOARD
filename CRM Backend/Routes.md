All Backend Routes

http://localhost:3000

// ----------------------------- For Contact -------------------------------------

1. Add contact : - http://localhost:3000/contacts (POST)
2. Retreive all contacts : - http://localhost:3000/contact (GET)
3. Retreive all contacts (with condition): - http://localhost:3000/contacts?key=value (GET)
4. Retreive specific contact : - http://localhost:3000/contact/id (GET)
5. Update specific contact : - http://localhost:3000/contact/id (PATCH)
6. Delete specific contact : - http://localhost:3000/contact/id (DELETE)

// ----------------------------- For Activity -------------------------------------

1. Add Activity : - http://localhost:3000/activities/contact/id (POST)
2. Retreive all activity : - http://localhost:3000/activities (GET)
3. Retreive activity for a specific contact: - http://localhost:3000/activities/contact/id (GET)
4. Delete activity : - http://localhost:3000/activities/id (DELETE)
