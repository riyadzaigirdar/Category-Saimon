
## CATEGORY PROJECT

#### EASILY START WITH DOCKER
    
    docker-compose up
    
    
## POSTMAN COLLECTION HAS BEEN INCLUDED IN THE PROJECT ROOT DIRECTORY
 
 
#### PROJECT CONTAINS 6 ROUTES

    1. CREATE SINGLE CATEGORY
    
       POST http://localhost:3000/api/v1/category
    
       BODY SAMPLE =>
        {
            "name": "category 5"
        }
        
    
    2. GET CATEGORY DETAIL
    
       GET http://localhost:3000/api/v1/category/:id
       
        
    3. UPDATE SINGLE CATEGORY
    
       PATCH http://localhost:3000/api/v1/category/:id
    
       BODY SAMPLE =>
        {
            "tile": 'category 10'
        } 
       
    
    4. DEACTIVATE CATEGORY ALONG WITH ITS CHILD CATEGORY
        
        PATCH http://localhost:3000/api/v1/category/:id/deactivate
        
    
    5. SEARCH CATEGORY WITH ITS CHILD CATEGORIES NESTED IN IT
        
        GET http://localhost:3000/api/v1/category/search?query=5
    
        QUERY SAMPLE => query='category 1'
        
        
    6. LIST CATEGORY WITH PAGINATION
    
        GET http://localhost:3000/api/v1/category?page=1&count=10
        
        QUERY SAMPLE => page=1 & count=10
        
        
