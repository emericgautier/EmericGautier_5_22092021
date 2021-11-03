
/*Fetching API*/

class request {

    static get(url) {
        return fetch(url)
          .then(function(httpBodyResponse) {
              if (httpBodyResponse.ok) {
                  return httpBodyResponse.json() /*Transforming data in json*/
              } else {
                  console.log(httpBodyResponse.statusText)
              }
          })
          .catch((error) => {
              console.log(error) /*Error message if API dysfunctionning*/
          }) 
    }

    static post(url, requestOptions) {
        return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            window.location.href = `${window.location.origin}/front-end/pages/order.html` /*send to page order*/
            localStorage.setItem('order', JSON.stringify(json))
        })
        .catch(() => {
            alert(error)
        })
    }
}

