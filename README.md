<div align="center">
    <img alt="eminus logo" src="https://github.com/s-r-x/eminus/blob/main/logo.svg" width="250">
    <br/>
    <p>Range slider for React</p> 
    <a href="https://s-r-x.github.io/eminus">Examples</a> 
</div>

## Usage

```bash
npm i eminus
```

```tsx
import React, { useState } from 'react';
import 'eminus/dist/style.css';
import Eminus from 'eminus';

const Component = () => {
  const [value, setValue] = useState([0, 42]);
  return <Eminus value={value} onChange={setValue} />;
};
```
