const express = require('express');
const router = express.Router();

// GET - 取得所有考題模式
router.get('/', (req, res) => {
  // 模擬資料，實際應該從資料庫取得
  const modes = [
    {
      id: 1,
      name: '連連看',
      code: `<template>
  <div class="connect-mode">
    <h3>連連看模式</h3>
    <!-- VUE 組件代碼 -->
  </div>
</template>

<script>
export default {
  name: 'ConnectMode',
  data() {
    return {
      items: []
    }
  }
}
</script>

<style scoped>
.connect-mode {
  /* 樣式 */
}
</style>`
    },
    {
      id: 2,
      name: '拖拉方塊',
      code: `<template>
  <div class="drag-mode">
    <h3>拖拉方塊模式</h3>
    <!-- VUE 組件代碼 -->
  </div>
</template>

<script>
export default {
  name: 'DragMode',
  data() {
    return {
      blocks: []
    }
  }
}
</script>

<style scoped>
.drag-mode {
  /* 樣式 */
}
</style>`
    },
    {
      id: 3,
      name: '單選題',
      code: `<template>
  <div class="single-choice-mode">
    <h3>單選題模式</h3>
    <!-- VUE 組件代碼 -->
  </div>
</template>

<script>
export default {
  name: 'SingleChoiceMode',
  data() {
    return {
      options: []
    }
  }
}
</script>

<style scoped>
.single-choice-mode {
  /* 樣式 */
}
</style>`
    }
  ];
  
  res.json({
    success: true,
    data: modes
  });
});

// GET - 取得單一模式
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // 這裡應該從資料庫查詢
  const mode = {
    id: parseInt(id),
    name: '連連看',
    code: '<template>...</template>'
  };
  
  res.json({
    success: true,
    data: mode
  });
});

// POST - 新增考題模式
router.post('/', (req, res) => {
  const { name, code } = req.body;
  
  if (!name || !code) {
    return res.status(400).json({
      success: false,
      message: '請提供模式名稱和代碼'
    });
  }
  
  // 這裡應該將資料儲存到資料庫
  const newMode = {
    id: Date.now(),
    name,
    code,
    createdAt: new Date()
  };
  
  res.json({
    success: true,
    message: '模式新增成功',
    data: newMode
  });
});

// PUT - 更新模式
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;
  
  // 這裡應該更新資料庫中的資料
  
  res.json({
    success: true,
    message: '模式更新成功',
    data: {
      id: parseInt(id),
      name,
      code,
      updatedAt: new Date()
    }
  });
});

// DELETE - 刪除模式
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // 這裡應該從資料庫刪除資料
  
  res.json({
    success: true,
    message: '模式刪除成功',
    deletedId: parseInt(id)
  });
});

module.exports = router;
