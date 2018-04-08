var chatScript = {
	1: {
		chat: 
		{
			0:{type:"MSG", from:"CUSTOMER", delay:5, body:"你好", next:1},
			1:{type:"MSG", from:"CUSTOMER", delay:2, body:"我想买蛋糕", next:2},
			2:{type:"MSG", from:"CUSTOMER", delay:1, body:"请问多少钱？", next:3},
			3:{type:"CHOICE", choices:[{body:"$100000", next:5}, {body:"$10", next:4}]},
			4:{type:"MSG", from:"CUSTOMER", delay:1, body:"啊，好的", next:null},
			5:{type:"MSG", from:"CUSTOMER", delay:1, body:"sb...", next:6},
			6:{type:"CHOICE", choices:[{body:"我是开玩笑的...", next:4}, {body:"你大爷", next:4}, {body:"滚", next:4}]},
		}
	},
	2: {
		chat: 
		{
			0:{type:"MSG", from:"CUSTOMER", delay:3, body:"你好", next:1},
			1:{type:"MSG", from:"CUSTOMER", delay:2, body:"我想买蛋糕", next:2},
			2:{type:"MSG", from:"CUSTOMER", delay:1, body:"请问多少钱？", next:3},
			3:{type:"CHOICE", choices:[{body:"$100000", next:5}, {body:"$10", next:4}]},
			4:{type:"MSG", from:"CUSTOMER", delay:1, body:"啊，好的", next:1},
			5:{type:"MSG", from:"CUSTOMER", delay:1, body:"sb...", next:2},
		}
	}
};

module.exports = {
	chatScript: chatScript
};