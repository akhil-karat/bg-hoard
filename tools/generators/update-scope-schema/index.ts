import { Tree, formatFiles, updateJson} from '@nrwl/devkit';

export default async function (tree: Tree) {
  await updateJson(tree, 'workspace.json', (workspaceJson) => {
    workspaceJson.defaultProject = 'api';

    return workspaceJson;
  });
  await formatFiles(tree);
}
