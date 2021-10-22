class Sequence{
    next() {
        return Math.floor(Math.random() * 1e8);
    }
}

export class WebsocketMessage<T = unknown> {
    seq: number;
    type: number = 0;
    body: T;

    static sequenceGenerator = new Sequence();
    static getSequence() {
        return this.sequenceGenerator;
    }
   
    constructor(type: number, body: T) {
        this.seq = WebsocketMessage.getSequence().next();
        this.type = type;
        this.body = body;
    }
}

export class WebsocketRequest {
    sentTime: number;
    callback: (response: WebsocketMessage) => void;
    constructor(callback: (response: WebsocketMessage) => void) {
        this.callback = callback;
        this.sentTime = Date.now();
    }
}

export class WebsocketResponse {
    statusCode: number;
    body: any;
    constructor(statusCode: number, body: any) {
        this.statusCode = statusCode;
        this.body = body;
    }
}

export class WebsocketError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class WebsocketClient extends WebSocket {
    private static requestsMap = new Map<number, WebsocketRequest>();

    onmessage = (msg: any) => {
        console.log(msg);
        try {
            const wsMsg = new WebsocketMessage(msg.type, msg.body);
            if (wsMsg.seq && WebsocketClient.requestsMap.has(wsMsg.seq)) {
                WebsocketClient.requestsMap.get(wsMsg.seq).callback(wsMsg);
            }
        } catch (err) {
            console.log(err);
        }
    };

    constructor(url: string | URL, protocols?: string | string[]) {
        super(url, protocols);
    }

    sendSync(data: WebsocketMessage): Promise<WebsocketResponse> {
        if (this.readyState !== WebSocket.OPEN) {
            throw new WebsocketError('Websocket`readyState should be open');
        }
        return new Promise((resolve, reject) => {
            const seq = data.seq;
            const fn = (msg: WebsocketMessage) => {
                // remove this request in requestsMap
                WebsocketClient.requestsMap.delete(seq);
                resolve(new WebsocketResponse(seq, msg));
            }
            WebsocketClient.requestsMap.set(seq, new WebsocketRequest(fn));

            try {
                this.send(JSON.stringify(data))
            } catch (error) {
                WebsocketClient.requestsMap.delete(seq);
                reject(error);
            }
        });
    }
}