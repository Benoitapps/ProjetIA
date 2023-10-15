# ProjetIA

________________________________________________________________

chatbot :
    -path :  /chat \n
    -body : { question (strings)} \n
    -response : { response : response (string) } \n

________________________________________________________________


recipe :
    -path : /recette
    -body : {
                question : question (strings)
                id : user connecter (int)
            }
    -response : {
                    name : "string"
                    preparation : "text"
                    ingredients : string[]
                    "image": "url"
                }   
