"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    // Get Current Date
    const currentDate = new Date().toLocaleDateString('en-SG', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    // Get configured name and id
    const config = vscode.workspace.getConfiguration('digipenComments');
    const name = config.get('name');
    const id = config.get('id');
    const section = config.get('section');
    // Create author string
    const authorStr = name + ' (' + id + ')';
    // Register Completion Providers
    const provider1 = vscode.languages.registerCompletionItemProvider(['c', 'cpp', 'cs'], {
        provideCompletionItems(document, position, token, context) {
            // File Comment Header Auto Completion
            const fileCommentCompletion = new vscode.CompletionItem('Documentation: File Level', vscode.CompletionItemKind.Text);
            //fileCommentCompletion.range = new vscode.Range(2,2,2,2)
            fileCommentCompletion.insertText =
                "/*!\n" +
                    "@file       @todo\n" +
                    "@author     " + authorStr + "\n" +
                    "@course     @todo\n" +
                    "@section    " + section + "\n" +
                    "@assignment @todo\n" +
                    "@date       " + currentDate + "\n" +
                    "@brief      @todo\n" +
                    "\n" +
                    "*//*__________________________________________________________________________*/\n\n";
            fileCommentCompletion.documentation = new vscode.MarkdownString("Inserts the file level documentation header.");
            // Function Comment Header Auto Completion
            const functionCommentCompletion = new vscode.CompletionItem('Documentation: Function Level', vscode.CompletionItemKind.Text);
            //functionCommentCompletion.insertText = new vscode.SnippetString('/*!\n@brief  @todo\n\n@param  @todo\n@return @todo\n*//*__________________________________________________________________________*/');
            functionCommentCompletion.insertText =
                "/*!\n" +
                    "@brief  @todo\n" +
                    "\n" +
                    "@param  @todo\n" +
                    "@return @todo\n" +
                    "*//*__________________________________________________________________________*/";
            functionCommentCompletion.documentation = new vscode.MarkdownString("Inserts the function level documentation header.");
            // return all completion items as array
            return [
                fileCommentCompletion,
                functionCommentCompletion
            ];
        }
    }, '/');
    context.subscriptions.push(provider1);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map