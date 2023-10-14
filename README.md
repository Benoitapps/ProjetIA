# ProjetIA

________________________________________________________________

chatbot :
    -path : /chat
    -body : {
                 question (strings)
            }
    -response : response : response (string)

________________________________________________________________


recipe :
    -path : /recette
    -body : {
                question : question (strings)
                id : user connecter (int)
            }
    -response : {
                    preparation : "text"
                    ingredients : string[]
                    "image": ...
                }   
