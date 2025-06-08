import { INodeProperties } from 'n8n-workflow';

export const runOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['run'],
			},
		},
		options: [
			{
				name: 'Get Run',
				value: 'get',
				description: 'Get a run by ID',
				action: 'Get a run by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/runs/{{$parameter["runId"]}}',
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
							response_format: '={{$parameter["responseFormat"]}}',
							json_schema: '={{$parameter["jsonSchema"] && $parameter["jsonSchema"] !== "{}" ? $parameter["jsonSchema"] : undefined}}',
							session_timeout: '={{$parameter["sessionTimeout"]}}',
							initial_url: '={{$parameter["initialUrl"] ? $parameter["initialUrl"] : undefined}}',
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
				action: 'Run an existing task',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/tasks/" + $parameter["taskId"] + "/runs"}}',
						body: {
							prompt: '={{$parameter["overridePrompt"] && $parameter["prompt"] !== "" ? $parameter["prompt"] : undefined}}',
							response_format: '={{$parameter["overrideResponseFormat"] && $parameter["responseFormat"] !== "" ? $parameter["responseFormat"] : undefined}}',
							json_schema: '={{$parameter["overrideResponseFormat"] && $parameter["responseFormat"] == "json" && $parameter["jsonSchema"] && $parameter["jsonSchema"] !== "{}" ? $parameter["jsonSchema"] : undefined}}',
							session_timeout: '={{parameter["overrideSessionTimeout"] ? $parameter["sessionTimeout"] : undefined}}',
							initial_url: '={{$parameter["overrideInitialUrl"] && $parameter["initialUrl"] ? $parameter["initialUrl"] : undefined}}',
							auth_context_id: '={{$parameter["overrideAuthContext"] && $parameter["authContextId"] ? $parameter["authContextId"] : undefined}}',
							wait_for_completion: '={{$parameter["waitForCompletion"] ? $parameter["waitForCompletion"] : undefined}}',						},
					},
				},
			},
		],
		default: 'createAndRunTask',
	},
];

const getTaskRunOperationFields: INodeProperties[] = [
	{
		displayName: 'Run ID',
		name: 'runId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the run to retrieve',
		displayOptions: {
			show: {
				resource: ['run'],
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
				resource: ['run'],
				operation: ['createAndRunTask'],
			},
		},
	},
	{
		displayName: 'Response Format',
		name: 'responseFormat',
		type: 'options',
		default: 'text',
		required: true,
		options: [
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'JSON',
				value: 'json',
			},
		],
		displayOptions: {
			show: {
				resource: ['run'],
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
				resource: ['run'],
				operation: ['createAndRunTask'],
				responseFormat: ['json'],
			},
		},
	},
	{
		displayName: 'Initial URL',
		name: 'initialUrl',
		type: 'string',
		default: '',
		description: 'Initial URL to start the task with',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['createAndRunTask'],
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
				resource: ['run'],
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
				resource: ['run'],
				operation: ['createAndRunTask'],
			},
		},
	},
	{
		displayName: 'Wait for Completion',
		name: 'waitForCompletion',
		type: 'boolean',
		default: true,
		description: 'Whether to wait for the task to complete before returning results',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['createAndRunTask'],
			},
		},
	},
];

const runTaskOperationFields: INodeProperties[] = [
	{
		displayName: 'Task Name or ID',
		name: 'taskId',
		type: 'options',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getTasks',
		},
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
			},
		},
	},
	{
		displayName: 'Override Prompt',
		name: 'overridePrompt',
		type: 'boolean',
		default: false,
		description: 'Whether to override default task prompt',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		default: '',
		required: true,
		description: 'The prompt to run the task with',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
				overridePrompt: [true],
			},
		},
	},
	{
		displayName: 'Override Response Format',
		name: 'overrideResponseFormat',
		type: 'boolean',
		default: false,
		description: 'Whether to override default task response format',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
			},
		},
	},
	{
		displayName: 'Response Format',
		name: 'responseFormat',
		type: 'options',
		default: 'text',
		required: true,
		options: [
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'JSON',
				value: 'json',
			},
		],
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
				overrideResponseFormat: [true],
			},
		},
	},
	{
		displayName: 'JSON Schema',
		name: 'jsonSchema',
		type: 'json',
		default: '{}',
		required: true,
		description: 'Optional, The JSON schema for the response format',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
				overrideResponseFormat: [true],
				responseFormat: ["json"],
			},
		},
	},
	{
		displayName: 'Override Initial URL',
		name: 'overrideInitialUrl',
		type: 'boolean',
		default: false,
		description: 'Whether to override default task initial URL',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
			},
		},
	},
	{
		displayName: 'Initial URL',
		name: 'initialUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'Initial URL to start the task with',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
				overrideInitialUrl: [true],
			},
		},
	},
	{
		displayName: 'Override Auth Context',
		name: 'overrideAuthContext',
		type: 'boolean',
		default: false,
		description: 'Whether to override default task auth context',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
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
		required: true,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
				overrideAuthContext: [true],
			},
		},
	},
	{
		displayName: 'Override Session Timeout',
		name: 'overrideSessionTimeout',
		type: 'boolean',
		default: false,
		description: 'Whether to override default task session timeout',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
			},
		},
	},
	{
		displayName: 'Session Timeout',
		name: 'sessionTimeout',
		type: 'number',
		default: 300,
		required: true,
		description: 'The timeout for the task session in seconds',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
				overrideSessionTimeout: [true],
			},
		},
	},
	{
		displayName: 'Wait for Completion',
		name: 'waitForCompletion',
		type: 'boolean',
		default: true,
		description: 'Whether to wait for the task to complete before returning results',
		displayOptions: {
			show: {
				resource: ['run'],
				operation: ['runTask'],
			},
		},
	},
];

export const runFields: INodeProperties[] = [
	...getTaskRunOperationFields,
	...createAndRunTaskOperationFields,
	...runTaskOperationFields,
];
