# Implementation guidline

1. Environment configuration    
- All environment configurations must located at **.env** file
- Never ever commit this file

2. Routing
- All router handling must located at **/routes**
- Must follow REST design conventions
- User credentials data such as password will never be expose to the response data

3. Database
- Document schema must be located at **/models**
- Each model need to be registed with the schema and exported with document name, eg: *Customer*
- Only accessing the database through exported Document model

4. API Testing
- All APIs must have sample testing request specified at **testAPI.http**