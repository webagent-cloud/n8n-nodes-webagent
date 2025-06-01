# n8n-nodes-webagent

This is an n8n community node. It lets you use [webagent.cloud](https://webagent.cloud/) in your n8n workflows.

[webagent.cloud](https://webagent.cloud/) is a browser automation platform based on open-source. It allows to automate web interaction with simple prommpts using AI.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Usage](#usage)
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Create and Run a New Task
Create a new task and execute it right away! Give your prompt and other parameters if needed.

- Run a Existing Task
This task allows you reuse an existing task and execute it. Useful if you want to organize your different tasks and retrieve tasks execution history in your dashboard.

- Get Task Run
This task allows to get the result of a task execution. Useful for longer tasks executed in background, you can use this task to check the task completion and its results.

## Credentials

To use the service, you need to get your webagent API KEY in [Webagent API KEY page](https://webagent.cloud/api-keys)

## Compatibility

n8n-nodes-webagent works well with n8n version 1.94.1 and above.
It could work with version below but has not been tested yet.

## Usage

To avoid errors from n8n default request timeout, both `Create and Run a New Task` and `Run an Existing Task` operations are executed in background by default and only return task and run id at first glance.
To use tasks task run results :
- Periodically fetch results with `Get Task Run` and the corresponding run id
- Or, if the task execution is short, activate `wait_for_completion` parameter in `Create and Run a New Task` and `Run an Existing Task` operations.

For more informations, refer to the [webagent documentation](https://docs.webagent.cloud/introduction)

## Resources

* [webagent documentation](https://docs.webagent.cloud/introduction)
* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## Version history

First version : 0.0.1


