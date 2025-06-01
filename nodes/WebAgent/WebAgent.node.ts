import { ILoadOptionsFunctions, INodePropertyOptions, INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { taskRunFields, taskRunOperations } from './WebagentDescription';

async function getAuthContexts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await this.helpers.requestWithAuthentication.call(this, 'webagentApi', {
    baseURL: `https://api.webagent.cloud`,
    url: `/auth-contexts`,
    method: 'GET',
    json: true,
  });

	const options: INodePropertyOptions[] = responseData.map((authContext: {name: string; id: string}) => {
		const name = authContext.name;
		const value = authContext.id;
		return { name, value };
	});
	return [{ name: 'No Auth Context', value: '' }, ...options];
}

export class Webagent implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Webagent',
    name: 'webagent',
    icon: 'file:webagent.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Webagent',
    defaults: {
      name: 'Webagent',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'webagentApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{$credentials?.domain || "https://api.webagent.cloud"}}',
      url: '',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Task Run',
            value: 'taskRun',
          },
        ],
        default: 'taskRun',
      },
      ...taskRunOperations,
      ...taskRunFields,
    ],
  };
  methods = {
		loadOptions: {
			getAuthContexts,
		},
	};
}