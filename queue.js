const config = require('./config.js');


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: config.aws_region});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});


function putUserReg(details) {

    var params = {
        // Remove DelaySeconds parameter and value for FIFO queues
       DelaySeconds: 10,
       MessageAttributes: {
         "first_name": {
           DataType: "String",
           StringValue: details.first_name
         },
         "last_name": {
           DataType: "String",
           StringValue: details.last_name
         },
         "email": {
           DataType: "String",
           StringValue: details.email
         },
         "github_handle": {
             DataType: "String",
             StringValue: details.github_handle
         }
       },
       MessageBody: "foo",
       // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
       // MessageGroupId: "Group1",  // Required for FIFO queues
       QueueUrl: "https://sqs.us-west-2.amazonaws.com/270357933177/policy_evaluation"
     };


    sqs.sendMessage(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      });

}

//test
//putUserReg({email: "foo", github_handle: "foo", first_name: "bar", last_name: "baz"})


module.exports ={putUserReg}



