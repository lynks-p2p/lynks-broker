var kad = require('kad');

var seed = {
  address: '10.40.48.19',
  port: 1338
};

var dht = new kad.Node({
  transport: kad.transports.UDP(kad.contacts.AddressPortContact({
    address: '10.40.50.30',
    port: 1338
  })),
  storage: kad.storage.FS('/home/yehia/Desktop/datadir')
});

dht.connect(seed,  {
  // dht.get(key, callback);
  // dht.put(key, value, callback);
});
