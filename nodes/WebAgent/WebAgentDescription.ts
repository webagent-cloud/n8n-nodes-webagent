import { INodeProperties } from 'n8n-workflow';

export const taskRunOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['taskRun'],
			},
		},
		options: [
			{
				name: 'Get Task Run',
				value: 'get',
				description: 'Get a task run by ID',
				action: 'Get a task run by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/runs/{{$parameter["taskRunId"]}}',
					},
				},
			},
			{
				name: 'Create And Run Task',
				value: 'createAndRunTask',
				description: 'Create And Run A New Task',
				action: 'Create and run task',
				routing: {
					request: {
						method: 'POST',
						url: '/runs',
						body: {
							prompt: '={{$parameter["prompt"]}}',
							json_schema: '={{$parameter["jsonSchema"] && $parameter["jsonSchema"] !== "{}" ? $parameter["jsonSchema"] : undefined}}',
							session_timeout: '={{$parameter["sessionTimeout"]}}',
							auth_context_id: '={{$parameter["authContextId"] ? $parameter["authContextId"] : undefined}}',
							wait_for_completion: '={{$parameter["waitForCompletion"] ? $parameter["waitForCompletion"] : undefined}}',
						},
					},
				},
			},
			{
				name: 'Run Task',
				value: 'runTask',
				description: 'Run An Existing Task',
				action: 'Run a existing task',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/tasks/" + $parameter["taskId"] + "/runs"}}',
						body: {
							prompt: '={{$parameter["prompt"] && $parameter["prompt"] !== "{}" ? $parameter["prompt"] : undefined}}',
							json_schema: '={{$parameter["jsonSchema"] && $parameter["jsonSchema"] !== "{}" ? $parameter["jsonSchema"] : undefined}}',
							session_timeout: '={{$parameter["sessionTimeout"]}}',
							auth_context_id: '={{$parameter["authContextId"] ? $parameter["authContextId"] : undefined}}',
							wait_for_completion: '={{$parameter["waitForCompletion"] ? $parameter["waitForCompletion"] : undefined}}',
						},
					},
				},
			},
		],
		default: 'createAndRunTask',
	},
];

const getTaskRunOperationFields: INodeProperties[] = [
	{
		displayName: 'Task Run ID',
		name: 'taskRunId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the task run to retrieve',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['get'],
			},
		},
	},
];

const createAndRunTaskOperationFields: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		default: '',
		description: 'The prompt to run the task with',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['createAndRunTask'],
			},
		},
	},
	{
		displayName: 'JSON Results',
		name: 'jsonResults',
		type: 'boolean',
		default: false,
		description: 'Whether to return results in JSON format',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['createAndRunTask'],
			},
		},
	},
	{
		displayName: 'JSON Schema',
		name: 'jsonSchema',
		type: 'json',
		default: '{}',
		description: 'Optional, The JSON schema for the response format',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['createAndRunTask'],
				jsonResults: [true],
			},
		},
	},
	{
		displayName: 'Auth Context Name or ID',
		name: 'authContextId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getAuthContexts',
		},
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['createAndRunTask'],
			},
		},
	},
	{
		displayName: 'Advanced Parameters',
		name: 'advancedParameters',
		type: 'boolean',
		default: false,
		description: 'Whether to show advanced parameters',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['createAndRunTask'],
			},
		},
	},
	{
		displayName: 'Session Timeout',
		name: 'sessionTimeout',
		type: 'number',
		default: 300,
		description: 'The timeout for the task session in seconds',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['createAndRunTask'],
				advancedParameters: [true],
			},
		},
	},
	{
		displayName: 'Wait for Completion',
		name: 'waitForCompletion',
		type: 'boolean',
		default: false,
		description: 'Whether to wait for the task to complete before returning results',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['createAndRunTask'],
			},
		},
	},
];

const runTaskOperationFields: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		description: 'The task to run',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
			},
		},
	},
	{
		displayName: 'Override Fields',
		name: 'overrideFields',
		type: 'boolean',
		default: false,
		description: 'Whether to override default task fields',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		default: '',
		description: 'The prompt to run the task with',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
				overrideFields: [true],
			},
		},
	},
	{
		displayName: 'JSON Results',
		name: 'jsonResults',
		type: 'boolean',
		default: false,
		description: 'Whether to return results in JSON format',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
				overrideFields: [true],
			},
		},
	},
	{
		displayName: 'JSON Schema',
		name: 'jsonSchema',
		type: 'json',
		default: '{}',
		description: 'Optional, The JSON schema for the response format',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
				overrideFields: [true],
				jsonResults: [true],
			},
		},
	},
	{
		displayName: 'Auth Context Name or ID',
		name: 'authContextId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getAuthContexts',
		},
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
				overrideFields: [true],
			},
		},
	},
	{
		displayName: 'Advanced Parameters',
		name: 'advancedParameters',
		type: 'boolean',
		default: false,
		description: 'Whether to show advanced parameters',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
				overrideFields: [true],
			},
		},
	},
	{
		displayName: 'Session Timeout',
		name: 'sessionTimeout',
		type: 'number',
		default: 300,
		description: 'The timeout for the task session in seconds',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
				overrideFields: [true],
				advancedParameters: [true],
			},
		},
	},
	{
		displayName: 'Wait for Completion',
		name: 'waitForCompletion',
		type: 'boolean',
		default: false,
		description: 'Whether to wait for the task to complete before returning results',
		displayOptions: {
			show: {
				resource: ['taskRun'],
				operation: ['runTask'],
			},
		},
	},
];

export const taskRunFields: INodeProperties[] = [
	...getTaskRunOperationFields,
	...createAndRunTaskOperationFields,
	...runTaskOperationFields,
];
