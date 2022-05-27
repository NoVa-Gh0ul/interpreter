import{world as e,ItemStack as t,MinecraftItemTypes as o}from"mojang-minecraft";import{players as a,whitelist as n,devBuild as r,addon_prefix as i}from"scripts/credentials/access.js";import{client as s}from"scripts/gametests/commands/message.js";import*as l from"mojang-minecraft";import*as c from"mojang-gametest";import*as m from"mojang-minecraft-server-admin";import*as d from"mojang-minecraft-ui";import{viewObj as u}from"scripts/viewObj.js";import{md5 as g}from"scripts/blueimp-md5/md5.js";import{SHA256 as f}from"scripts/sha256.js";import{ModalFormData as p,MessageFormData as j}from"mojang-minecraft-ui";import{cloneJSON as b}from"scripts/clonejson.js";import{Base64 as F}from"scripts/base64.js";import v from"scripts/gametests/atrributions.js";export const formSettings={ModalForm:{dropdown:{defaultValueIndex:null},slider:{defaultValue:null},textField:{defaultValue:null},toggle:{defaultValue:null}}};e.events.beforeChat.subscribe((e=>{const{message:r,sender:l}=e;let c=l.name??l.nameTag,m=!1;if(m=!(1!=n||!a.includes(c))||0==n,r==`${i}javascript`&&1==m){e.cancel=!0;let a=new t(o.enchantedBook,1);a.nameTag="§r§dJavaScript interpreter",a.setLore(["§r§5Use this item to open JavaScript interpreter"]),l.getComponent("minecraft:inventory").container.addItem(a),s(c,`You have been given a ${a.nameTag}`)}else r==`${i}attributions`&&1==m&&(e.cancel=!0,s(c,v()))}));export function codeExecute(e,t,o){let a=o,n=new p;n.title("JavaScript Interpreter"),n.textField("Text Field","Type here",a.ModalForm.textField.defaultValue),n.toggle("Use Mojang Namespace",a.ModalForm.toggle.defaultValue),n.show(e).then((o=>{const{formValues:n}=o;let[i,p]=n;/[a-z]/i.test(i)&&s(t,`${i}`);const j=(new Date).getTime();if(1==p){!0===r&&console.warn(`JavaScript: §6Program starts at: ${new Date}`);try{const e={...l,...c,...d,...m,viewObj:u,md5:g,sha256:f,cloneJSON:b,Base64:F};new Function(`{${Object.keys(e).join(",")}}`,`return (function () { ${i} });`)(e)(),!0===r&&console.warn(`JavaScript: §aAll checks have passed. Time Duration: ${((new Date).getTime()-j)/1e3} seconds`),a.ModalForm.toggle.defaultValue=p,a.ModalForm.textField.defaultValue=i}catch(o){h(o,j,e,t,a,p,i)}}else try{const e={mojangminecraft:l,mojanggametest:c,mojangminecraftui:d,mojangnet:{},mojangminecraftserveradmin:m,viewObj:u,md5:g,sha256:f,cloneJSON:b,Base64:F};new Function(`{${Object.keys(e).join(",")}}`,`return (function () { ${i} });`)(e)(),a.ModalForm.toggle.defaultValue=p,a.ModalForm.textField.defaultValue=i}catch(o){h(o,j,e,t,a,p,i)}}))}function h(e,t,o,a,n,i,l){let c=new j;if(!0===r){console.warn(`JavaScript: §cSome checks were not successful. Time Duration: ${((new Date).getTime()-t)/1e3} seconds`);var m=e.stack?`\n${e.stack}`:"";s(a,`Dev build POV:\n§c${String(e+m)}`),m=e.stack?`\n${e.stack.split("\n").slice(0,-2).join("\n")}`:"",s(a,`Non-dev build POV:\n§c${String(e+m)}`),c.title("Scripting Error").body(String(e+m)).button1("Exit").button2("Fix Your Code"),c.show(o).then((e=>{const{selection:t}=e;0===t&&(n.ModalForm.toggle.defaultValue=i,n.ModalForm.textField.defaultValue=l,codeExecute(o,a,n))}))}else{m=e.stack?`\n${e.stack.split("\n").slice(0,-2).join("\n")}`:"";s(a,`§c${String(e+m)}`),c.title("Scripting Error").body(String(e+m)).button1("Exit").button2("Fix Your Code"),c.show(o).then((e=>{const{selection:t}=e;0===t&&(n.ModalForm.toggle.defaultValue=i,n.ModalForm.textField.defaultValue=l,codeExecute(o,a,n))}))}}e.events.beforeItemUse.subscribe((e=>{let{source:t,item:o}=e,a=t.name??t.nameTag;if("minecraft:enchanted_book"==o.id&&"§r§5Use this item to open JavaScript interpreter"==o.getLore()[0]){let e=formSettings;null==e.ModalForm.toggle.defaultValue&&(e.ModalForm.toggle.defaultValue=!0),codeExecute(t,a,e)}}));