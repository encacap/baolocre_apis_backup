/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { LoginResponseEntity } from 'src/entities/auth/loginResponse.entity';
import { CreateUserEntity } from '../../entities/user/createUser.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<LoginResponseEntity>;
    register(user: CreateUserEntity): Promise<{
        user: Pick<import("mongoose").Document<unknown, any, import("../user/user.model").UserDocument> & import("../user/user.model").UserDocument & {
            _id: import("mongoose").Types.ObjectId;
        }, "set" | "get" | "remove" | "validate" | "_id" | "__v" | "$assertPopulated" | "$getAllSubdocs" | "$ignore" | "$isDefault" | "$isDeleted" | "$getPopulatedDocs" | "$isEmpty" | "$isValid" | "$locals" | "$markValid" | "$model" | "$op" | "$session" | "$set" | "$where" | "baseModelName" | "collection" | "db" | "delete" | "deleteOne" | "depopulate" | "directModifiedPaths" | "equals" | "errors" | "getChanges" | "id" | "increment" | "init" | "invalidate" | "isDirectModified" | "isDirectSelected" | "isInit" | "isModified" | "isNew" | "isSelected" | "markModified" | "modifiedPaths" | "modelName" | "overwrite" | "$parent" | "populate" | "populated" | "replaceOne" | "save" | "schema" | "toJSON" | "toObject" | "unmarkModified" | "update" | "updateOne" | "validateSync" | "normalize" | "email" | "firstName" | "lastName" | "roles" | "URL" | "alinkColor" | "all" | "anchors" | "applets" | "bgColor" | "body" | "characterSet" | "charset" | "compatMode" | "contentType" | "cookie" | "currentScript" | "defaultView" | "designMode" | "dir" | "doctype" | "documentElement" | "documentURI" | "domain" | "embeds" | "fgColor" | "forms" | "fullscreen" | "fullscreenEnabled" | "head" | "hidden" | "images" | "implementation" | "inputEncoding" | "lastModified" | "linkColor" | "links" | "location" | "onfullscreenchange" | "onfullscreenerror" | "onpointerlockchange" | "onpointerlockerror" | "onreadystatechange" | "onvisibilitychange" | "ownerDocument" | "pictureInPictureEnabled" | "plugins" | "readyState" | "referrer" | "rootElement" | "scripts" | "scrollingElement" | "timeline" | "title" | "visibilityState" | "vlinkColor" | "adoptNode" | "captureEvents" | "caretRangeFromPoint" | "clear" | "close" | "createAttribute" | "createAttributeNS" | "createCDATASection" | "createComment" | "createDocumentFragment" | "createElement" | "createElementNS" | "createEvent" | "createNodeIterator" | "createProcessingInstruction" | "createRange" | "createTextNode" | "createTreeWalker" | "execCommand" | "exitFullscreen" | "exitPictureInPicture" | "exitPointerLock" | "getElementById" | "getElementsByClassName" | "getElementsByName" | "getElementsByTagName" | "getElementsByTagNameNS" | "getSelection" | "hasFocus" | "hasStorageAccess" | "importNode" | "open" | "queryCommandEnabled" | "queryCommandIndeterm" | "queryCommandState" | "queryCommandSupported" | "queryCommandValue" | "releaseEvents" | "requestStorageAccess" | "write" | "writeln" | "addEventListener" | "removeEventListener" | "baseURI" | "childNodes" | "firstChild" | "isConnected" | "lastChild" | "nextSibling" | "nodeName" | "nodeType" | "nodeValue" | "parentElement" | "parentNode" | "previousSibling" | "textContent" | "appendChild" | "cloneNode" | "compareDocumentPosition" | "contains" | "getRootNode" | "hasChildNodes" | "insertBefore" | "isDefaultNamespace" | "isEqualNode" | "isSameNode" | "lookupNamespaceURI" | "lookupPrefix" | "removeChild" | "replaceChild" | "ATTRIBUTE_NODE" | "CDATA_SECTION_NODE" | "COMMENT_NODE" | "DOCUMENT_FRAGMENT_NODE" | "DOCUMENT_NODE" | "DOCUMENT_POSITION_CONTAINED_BY" | "DOCUMENT_POSITION_CONTAINS" | "DOCUMENT_POSITION_DISCONNECTED" | "DOCUMENT_POSITION_FOLLOWING" | "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC" | "DOCUMENT_POSITION_PRECEDING" | "DOCUMENT_TYPE_NODE" | "ELEMENT_NODE" | "ENTITY_NODE" | "ENTITY_REFERENCE_NODE" | "NOTATION_NODE" | "PROCESSING_INSTRUCTION_NODE" | "TEXT_NODE" | "dispatchEvent" | "oncopy" | "oncut" | "onpaste" | "activeElement" | "fullscreenElement" | "pictureInPictureElement" | "pointerLockElement" | "styleSheets" | "elementFromPoint" | "elementsFromPoint" | "getAnimations" | "fonts" | "onabort" | "onanimationcancel" | "onanimationend" | "onanimationiteration" | "onanimationstart" | "onauxclick" | "onblur" | "oncanplay" | "oncanplaythrough" | "onchange" | "onclick" | "onclose" | "oncontextmenu" | "oncuechange" | "ondblclick" | "ondrag" | "ondragend" | "ondragenter" | "ondragleave" | "ondragover" | "ondragstart" | "ondrop" | "ondurationchange" | "onemptied" | "onended" | "onerror" | "onfocus" | "onformdata" | "ongotpointercapture" | "oninput" | "oninvalid" | "onkeydown" | "onkeypress" | "onkeyup" | "onload" | "onloadeddata" | "onloadedmetadata" | "onloadstart" | "onlostpointercapture" | "onmousedown" | "onmouseenter" | "onmouseleave" | "onmousemove" | "onmouseout" | "onmouseover" | "onmouseup" | "onpause" | "onplay" | "onplaying" | "onpointercancel" | "onpointerdown" | "onpointerenter" | "onpointerleave" | "onpointermove" | "onpointerout" | "onpointerover" | "onpointerup" | "onprogress" | "onratechange" | "onreset" | "onresize" | "onscroll" | "onsecuritypolicyviolation" | "onseeked" | "onseeking" | "onselect" | "onselectionchange" | "onselectstart" | "onslotchange" | "onstalled" | "onsubmit" | "onsuspend" | "ontimeupdate" | "ontoggle" | "ontouchcancel" | "ontouchend" | "ontouchmove" | "ontouchstart" | "ontransitioncancel" | "ontransitionend" | "ontransitionrun" | "ontransitionstart" | "onvolumechange" | "onwaiting" | "onwebkitanimationend" | "onwebkitanimationiteration" | "onwebkitanimationstart" | "onwebkittransitionend" | "onwheel" | "childElementCount" | "children" | "firstElementChild" | "lastElementChild" | "append" | "prepend" | "querySelector" | "querySelectorAll" | "replaceChildren" | "createExpression" | "createNSResolver" | "evaluate">;
        authToken: string;
    }>;
}
