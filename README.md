# ProjetIA

## Backend : NodeJS

### Installation

```bash
npm install
```

### Usage

```bash
npm start
```

## Routes

### Chatbot
```
-path :  /chat
-body : 
    { 
        question (strings)
    }
-response : 
    { 
        response : response (string)
    }
```

### Recipe
```
-path : /recette
-body : 
    {
        question : question (strings)
    }
-response : 
    {
        name : "string"
        preparation : "text"
        ingredients : string[]
        image: "url"
    }   
```

### Favoris
```JSON
-path : /favoris (post)
-body : 
    {
        userId : int,
        recipeId : int
    }
-response : 
    {
        message: "Favoris ajouté !",
        like: "true"
    }   


-path : /favoris (get)
-body : 
    {
        userId : int,
    }
-response : 
    {
        favoris : id[]
    }   

-path : /favoris (delete)
-body : 
    {
        userId : int,
        recipeId : int
    }
-response : 
    {
        message: "Favoris supprimé !",
    }
```

### Commment
```JSON
-path : /comment (post)
-body : 
    {
        "note": int,
        "recipeId": int,
        "userId":int,
        "message": "string"
    }
-response : 
    {
        message: "Comment ajouté !",
    }   


-path : /comment (get)
-body : 
    {
        "recipeId": int,
    }
-response : 
    {
        comment : obj[] ({id , note, user_id, message, recipe_id})
    }   


-path : /comment (delete)
-body : 
    {
        "userId": int,
        "commentId": int,
    }
-response : 
    {
        message: "Comment supprimé !",
    }
```


### FoodPreferences
```JSON
-path : /foodPreference (post)
-body : 
    {
        "userId":int,
        "nameFood": "string"
    }
-response : 
    {
        message: "FoodPreference ajouté !",
    }   


-path : /foodPreference (get)
-body : 
    {
        "userId": int,
    }
-response : 
    {
        comment : obj[] ({id , name, user_id})
    }   


-path : /foodPreference (delete)
-body : 
    {
        "userId": int,
        "foodId": int,
    }
-response : 
    {
        message: "foodPreference supprimé !",
    }
```


### Search recipe
```
-path : /search
-body : 
    {
        recipe : recipe (strings)
    }
-response : 
    {
        {
            "name": "nom de la recette principale",
            "description": "description de la recette",
            "time": "temps de préparation total de la recette",
        },
        similar_recipes: [
            {
                name: 'Tarte aux poires',
                description: "Une tarte succulente aux poires juteuses et parfumées, sublimées par une délicieuse crème d'amandes et une pâte croustillante.",
                time: '1h30'
            },
            {
                name: 'Tarte aux fraises',
                description: "Une tarte aux fraises gourmande et acidulée, avec une pâte croustillante et une garniture de fraises fraîches nappées d'une délicate gelée.",
                time: '45 minutes'
            },
            {
                name: 'Tarte aux cerises',
                description: 'Une tarte aux cerises succulente et juteuse, avec une pâte légère et croustillante et une généreuse garniture de cerises fraîches.',
                time: '1h15'
            }
        ]
    }
````

## Frontend : ReactJS

### Installation

```bash
npm install
```

### Usage

```bash
npm run dev
```

## Contributors
- COURANT Melvin
- DE CARLI Benoît
- CAPELLA Nicolas