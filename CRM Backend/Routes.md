All Backend Routes

// ----------------------------- For Contact -------------------------------------

1. Add contact : - http://localhost:3000/contacts (POST)
2. Retreive all contacts : - http://localhost:3000/contact (GET)
3. Retreive all contacts (with condition): - http://localhost:3000/contacts?key=value (GET)
4. Retreive specific contact : - http://localhost:3000/contact/id (GET)
5. Update specific contact : - http://localhost:3000/contact/id (PATCH)
6. Delete specific contact : - http://localhost:3000/contact/id (DELETE)

// ----------------------------- For Activity -------------------------------------

1. Add an Activity : - http://localhost:3000/activities/contact/id (POST)
2. Retreive all activity : - http://localhost:3000/activities (GET)
3. Retreive activities for a specific contact: - http://localhost:3000/activities/contact/id (GET)
4. Update activity : - http://localhost:3000/activities/id (PATCH)
5. Delete activity : - http://localhost:3000/activities/id (DELETE)

// ----------------------------- For Deals -------------------------------------

1. Add a Deal : - http://localhost:3000/deals/contact/id (POST)
2. Retreive all Deals : - http://localhost:3000/deals (GET)
3. Retreive all deals for a specific contact: - http://localhost:3000/deals/contact/id (GET)
4. Upadate a deal : - http://localhost:3000/deals/id (PATCH)
5. Delete a deal : - http://localhost:3000/deals/id (DELETE)
