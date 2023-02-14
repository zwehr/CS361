# CS361 Avatar Microservice

This service provides different colored avatars that can be associated with user accounts/comments.

## How to Request Data

Requests can be made to the Node/Express server at https://cs361-avatar-microservice.onrender.com/

Specifically, to request all avatars, make a request to **/all**:

https://cs361-avatar-microservice.onrender.com/all

For a single color, make a request to **/:color** (choosing one of red, green, blue, yellow, pink, or orange):

https://cs361-avatar-microservice.onrender.com/green

You can also request a single **random** color:

https://cs361-avatar-microservice.onrender.com/random

## How to Receive Data

After requesting data, you will receive a response in the form of JSON. For example, requesting /red would lead to the following response:

{\
  "color": "red",\
  "width": "200px",\
  "height": "200px",\
  "url": "https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-red.jpg?alt=media&token=d17e13b7-c35e-4ff2-bcca-448ab5bc219a" \
}

The response includes the color, width, height, and link to where the resource is stored with Firebase Storage.

## UML Sequence Diagram

![Sequence Diagram](sequence-diagram.png?raw=true "Sequence Diagram")