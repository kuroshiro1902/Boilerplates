#! Create Component - cc.cjs

const fs = require('fs');
const path = require('path');

// Lấy đường dẫn tùy chỉnh từ dòng lệnh
const customPath = process.argv[2];
const srcPath = 'src';

// Kiểm tra xem đường dẫn đã được cung cấp hay chưa
if (!customPath) {
  console.error('Please specify the component path');
  process.exit(1);
}

// Tách tên component từ đường dẫn
const componentName = path.basename(customPath);
const componentDirPath = customPath.includes('/')
  ? customPath
  : `components/${componentName}`;
const componentDir = path.join(__dirname, srcPath, componentDirPath);
const componentPath = path.join(componentDir, `${componentName}.tsx`);
const stylePath = path.join(componentDir, `${componentName}.module.scss`);

const template = `import {  } from 'react';
import s from './${componentName}.module.scss';

interface props{
	
};

function MyComponent(props: props){
  return (
    <div>
      MyComponent component
    </div>
  )
};

export default MyComponent;
`;

// Kiểm tra và tạo thư mục nếu nó chưa tồn tại
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Tạo file .tsx cho component
fs.writeFileSync(componentPath, template, 'utf8');
// Tạo file .scss cho component
const firstChar = componentName.charAt(0);
fs.writeFileSync(
  stylePath,
  `.${firstChar.toLowerCase() + componentName.substring(1)} {\n\t\n}`,
  'utf8'
);

console.log(
  `Component ${componentName} has been created at ${
    srcPath + '/' + componentDirPath
  }`
);

// Đặt file cùng cấp với package.json.
// Thêm "cc": "node ./cc.cjs" vào scripts trong package.json.
/*
  Mở Git Bash terminal.
  Cấp quyền cho script:
  >> chmod +x cc.cjs
*/

/*
  Tạo một component mới:
  (mặc định component sẽ nằm trong thư mục components nếu không chỉ định đường dẫn cụ thể)
  
  >> npm run cc MyComponent 
    -> src/components/MyComponent/ MyComponent.tsx + MyComponent.module.scss 

  >> npm run cc customPath/MyComponent 
    -> src/customPath/MyComponent/ MyComponent.tsx + MyComponent.module.scss
*/
