+++
categories = ["job-experience"]
coders = []
description = "Summer 2021-2022 AWS Internship Experience"
github = []
image = "aws_job.svg"
title = "AWS CloudFormation Internship Experience"
type = "post"
date = 2022-08-25
+++
## Overview
During summer 2021 and summer 2022s, I worked as an SDE intern at AWS CloudFormation. This post explains my experiences over these summers. 

[AWS CloudFormation](https://aws.amazon.com/cloudformation/) is Amazon's Infrastructure as Code (IaC) solution. By specifying resources, (any infrastructure that can be provisioned via CloudFormation) in a template in JSON or YAML format, CloudFormation will automatically provision resources in a predictable manner, helping with scale, and managing infrastructure with DevOps.

## Summer 2021
### Project Description
Using the [Resource Provider Plugin](https://github.com/aws-cloudformation/cloudformation-cli-java-plugin), a developer can create their own CloudFormation resources such that CloudFormation can provision said resources for customers. I created a feature for developers to be able to configure the visibility of properties within a resource to prevent premature property leakage. 

This feature especially helps AWS service teams launch new features with day 1 support, facilitating instant feature delivery. 
### Skills
- API Development
- Backend Service Development
- CI/CD
### Technologies used
- Java
- AWS Lambda
- AWS EC2
- AWS DynamoDB
- AWS CloudFormation

## Summer 2022
### Project Description
I created a tooling suite to track performance for handlers that execute provisioning logic for AWS CloudFormation. This tooling does automatic API call tracking to track API call durations for these resource provisioning handlers. I also added latency and stabilization metrics for these handlers, as well as dashboards to monitor this data. The tooling suite also adds optional instrumentation to such handlers to get detailed profiling data for such handlers.
### Skills
### Technologies used
- Java
- Python
- AWS SDK
- AWS CloudFormation
- AWS CloudWatch
- AWS CodeGuru
- AWS Xray
- AWS CloudFormation
- AWS IAM