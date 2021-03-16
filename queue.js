const config = require('./config.js');


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: config.aws_region});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var sqs_queue_url = ""

function init() {
  console.log("Initializing SQS plubming. Checking for SQS Queue")
  var getQueueParams = {
    QueueName: config.sqs_queue_name
  };

  sqs.getQueueUrl(getQueueParams, function(err, data) {
    if (err) {
      console.log("Error", err);
      console.log("Createing SQS Queue")
      var queueParams = {
        QueueName: config.sqs_queue_name,
        Attributes: {
          'DelaySeconds': '60',
          'MessageRetentionPeriod': '86400'
        }
      };

      sqs.createQueue(queueParams, function(err, data) {
        if (err) {
          console.log("Error", err);
          throw err;
        } else {
          console.log("Queue created: ", data.QueueUrl);
          sqs_queue_url = data.QueueUrl
        }
      });

    } else {
      console.log("Found exisitng queue: ", data.QueueUrl);
      sqs_queue_url = data.QueueUrl
    }

    
  });


}

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
         }
       },
       MessageBody: "foo",
       // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
       // MessageGroupId: "Group1",  // Required for FIFO queues
       QueueUrl: sqs_queue_url
     };


    sqs.sendMessage(params, function(err, data) {
        if (err) {
          console.log("Error", err);
          throw err
        } else {
          console.log("Success", data.MessageId);
        }
      });

}

//test
//putUserReg({email: "foo", github_handle: "foo", first_name: "bar", last_name: "baz"})


module.exports = {putUserReg, init}



