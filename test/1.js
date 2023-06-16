const tree = [
  {
    value: 1,
    children: [
      {
        value: 3,
        children: [
          {
            value: 6,
            children: [
              {
                value: 8,
              },
              {
                value: 9,
              },
            ],
          },
          {
            value: 7,
            children: [
              {
                value: 10,
              },
            ],
          },
        ],
      },
      {
        value: 4,
      },
      {
        value: 5,
      },
    ],
  },
  {
    value: 2,
  },
];

function findAllPath(tree, target) { 

  // 给树的每个节点加一个层级属性
  function addLevel(tree, level = 1) {
    tree.forEach((node) => {
      node.level = level;
      if (node.children) {
        addLevel(node.children, level + 1);
      }
    });
  }

  addLevel(tree)

  // 获取某个节点从根节点到这个节点的路径
  function getPath(tree, value) {
    const path = [];
    function findPath(tree, value) {
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.value === value) {
          path.push(node);
          return true;
        }
        if (node.children) {
          path.push(node);
          if (findPath(node.children, value)) {
            return true;
          }
          path.pop();
        }
      }
      return false;
    }
    findPath(tree, value);
    return path;
  }

  const path = getPath(tree, target);

  // 获取某个节点的所有子节点，包括子节点的子节点，一直到叶子节点
  function getChildren(tree, value) {
    const children = [];
    function findChildren(tree, value) {
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.value === value) {
          if (node.children) {
            node.children.forEach(item => {
              children.push(item)
              findChildren(node.children, item.value)
            })
          }
          return true;
        }
        if (node.children) {
          if (findChildren(node.children, value)) {
            return true;
          }
        }
      }
      return false;
    }
    findChildren(tree, value);
    return children;
  }

  const children = getChildren(tree, target)

  console.log('path.concat(children)', path.concat(children));

  return path.concat(children)
}

function batchFindAllPath(tree, ids) { 
  const levels = [
    new Set(),
    new Set(),
    new Set(),
    new Set(),
  ];
  ids.forEach(id => { 
    const path = findAllPath(tree, id);
    path.forEach(item => { 
      if (item.level === 1) {
        levels[0].add(item.value)
      } else if (item.level === 2) {
        levels[1].add(item.value)
      } else if (item.level === 3) {
        levels[2].add(item.value)
      } else if (item.level === 4) {
        levels[3].add(item.value)
      }
    })
  })

  return [
    Array.from(levels[0]),
    Array.from(levels[1]),
    Array.from(levels[2]),
    Array.from(levels[3]),
  ]
}

console.log(batchFindAllPath(tree, [8, 9]));






