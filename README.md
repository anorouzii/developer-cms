<p align="center"> <img  width="80px" height="80px" src="https://i.ibb.co/9YkQVrH/logo.png"/> </p>
<h1 align="center"> Developer CMS </h1>

<p align="center">A clean & focused headless CMS for dynamic parts of your website</p>
<p align="center">You can deploy the CMS on AWS, DigitalOcean, opeNode, Microsoft Azure and so on, then interact with it via API</p>
<br><br>

![Developer CMS](https://i.ibb.co/hX0Qd45/admin.png)


## ⭐ Features

* Publish or Draft your posts, page, portfolios and more as Contents
* Clean data support (an object of content instead of raw HTML)
* Receive message
* Extra fields for additional information to include your API
* Secure and Customizable

## 📍 Installation

First you need a free mongodb atlas database (<a href="https://www.mongodb.com/" target="_blank">Sign Up</a>) .
then you need to edit your config.json file in `config` directory

```
{
  "admin": {
    "username": "admindemo",
    "password": "admindemo"
  },
  "database": {
    "content": "mongodb+srv://USERNAME:PASSWORD@cluster0-xxx.mongodb.net/xxxxx?retryWrites=true&w=majority"
  },
  "jtw" : {
    "secretKey" : "YOURSECRET KEY",
    "expireToken" : 360000
  }
}
```
Now, we are ready to deploy developer-cms on node.js hosting 


## 📒 Useage

Get all contents
```
yoursite.com/api/contents
```
Get a specific content
```
yoursite.com/api/contents/id
```

Send Message (Name - Email - Message should be post in JSON Format)
```
yoursite.com/api/messages
```
Get all Extra Fields
```
yoursite.com/api/extra-fields
```
Get a specific Extra Field
```
yoursite.com/api/extra-fields/id
```


#### Use clean data

the clean data is some like this and it generated by <a  target="_blank" href="https://quilljs.com/docs/delta/">Quilljs Delta</a>

```
"ops": [
        {
          "insert": {
            "image": "https://developer-cms.herokuapp.com/post2.jpg"
          }
        },
        {
          "insert": "\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          "attributes": {
            "background": "#000000",
            "color": "#ffffff"
          },
          "insert": "Excepteur"
        }
      ]
```
To convert this object to html and display it on web pages, you can use modules such as <a href="https://www.npmjs.com/package/quill-delta-to-html">quill-delta-to-html</a>



## 💡 Live demo
use `admindemo` for both username and password.

```
https://devcms.ir
```

🙏 Thanks to <a href="https://www.openode.io/">opeNode.io</a> for providing free node.js hosting for this project

## 🛠 Built with
Node.js . Express . MongoDB . JWT . React . Redux . Quill

