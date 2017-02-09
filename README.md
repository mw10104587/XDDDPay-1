# XDDD Pay
Please visit our deployed application [here](http://flask-env.k2bwedhc5k.us-west-2.elasticbeanstalk.com/#/login).
For better readability of this document, please visit our [github repo](https://github.com/mw10104587/XDDDPay/blob/master/README.md)

# Team Name
XDDDPay

XDDD is sort of a smiling emoji that you'll have to see it by rotating your head.

# Team Members
| Name          | UNI           |
| ------------- | ------------- |
| Chi-An Wang   | cw2897        |
| Xiyan Liu     | xl2672        |
| Li-Chieh Liu  | ll3123        |
| Ching-Hui Hsu | ch3230        |
| Yi Qi         | yq2211        |


This is a modern as a service (COMS E6998) course at Columbia University. This application gives us the oppurtunity to practice the implementation of the following features.
- User log in and log out with [JWT](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
- Implement basic shopping cart
- Use stripe API
- use [Elastic Beanstalk](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html) to serve our pages and server.


## Packages, engines and Database
1. [Express](http://expressjs.com), a node js web framework that works as the main url redirecting tool.
2. [jade](), a template engine that makes writing html more elegant, but it's basically html, but less code.
3. [ElephantSQL](https://www.elephantsql.com/docs/index.html) a posgresql as a service


## Structure
- bin: entry point, where we really setup the server and serve this application
- public: a directory storing most of the static contents including images, css and javascript files.
- routes: for each route, we have different handlers, or different part of programs that handle that request, they are all defined in here.
- views: most of the jade and html files are in here (which is pretty obvious regarding its name).

#### To complete the setting, read [app.js](https://github.com/mw10104587/XDDDPay/blob/master/app.js)

## How to setup this application
MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK


## ElephantSQL
[Where to store database url information on Elastic Beanstalk?](https://alexdisler.com/2016/03/26/nodejs-environment-variables-elastic-beanstalk-aws/)
```
CREATE TABLE transaction(
  uid char(16),
  transaction_id int,
  contents char(128),
  timestamp bigint,
  amount int,
  PRIMARY KEY(uid, transaction_id)
);

INSERT INTO transaction (uid, transaction_id, contents, timestamp, amount) VALUES 
('mw10104587', 00000001, '[{"name": "LaFerrari", "price": 1150000}, {"name": "Escalade ESV", "price": 76000}]', 1486451884, 1226000);
```

#### How to access our database?
Enter the following code in the terminal
```
psql postgres://vbdwkdtg:4HumJWe1ZS_7aa1idrWSFFyMXnwHt4kb@babar.elephantsql.com:5432/vbdwkdtg
```

Check whether new row is in our only table
```
SELECT * FROM transaction;
```

and finally quit the session
```
\q
```




# Problems Encountered until Feb.09
### Multiple servers
Due to miscommunication, we failed to have a consensus about what server we're going to work on. The first part of our application(log in) was implemented with flask(a Python framework), and the latter part was implemented using **node.js**.
In order to redirect the user to the latter part, our temporary solution was to append the username at the end of the request url to the second server.

### Failed to move **static files** from Elastic Beanstalk to S3.
MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK MTK 







