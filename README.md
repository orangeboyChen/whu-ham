在这里可以更新图书馆基础数据。

json格式：
```json
{
  "buildings": 
          [
            {
              "id": 1,
              "name": "图书馆名称"
            }
          ],
  "rooms": {
    "1": [
      {
        "id": 2,
        "name": "房间名称",
        "floor": "楼层"
      }
    ]
  }
}
```

rooms里的key为value（房间列表）里每个房间对应building的id。