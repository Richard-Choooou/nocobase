/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { RecursionField, Schema, observer, useField, useFieldSchema } from '@formily/react';
import { action } from '@formily/reactive';
import { uid } from '@formily/shared';
import { useDesignable } from '../../hooks/useDesignable';
import { SortableItem, useSchemaToolbarRender } from '@nocobase/client';

export const TableColumnGroup = (props: {
  title: string
}) => {
  const filedSchema = useFieldSchema();
  const { render } = useSchemaToolbarRender(filedSchema); // 从 Schema 中读取 Toolbar 组件
  const field = useField()
  const { designable } = useDesignable()
  return <SortableItem>
    <div>{render()}{field.title}{designable && <AddGroup></AddGroup>}</div>
  </SortableItem>
};


export const AddGroup = () => {
  const schema = useFieldSchema();
  const xUid = schema['x-uid']
  const { designable, dn, insertAdjacent } = useDesignable();
  const [isModalOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  return <div>
    <Button style={{marginRight: 4}} size='small' onClick={() => setIsOpen(true)}>新增分组</Button>
    <Modal title="设置分组标题" open={isModalOpen} onOk={() => {
      const id = uid()
      insertAdjacent('beforeEnd', {
        'name': id,
        'type': 'void',
        // 'x-uid': id,
        'x-component': 'TableV2.ColumnGroup',
        'x-settings': 'fieldSettings:TableColumn',
        'x-toolbar': 'TableColumnSchemaToolbar',
        // 'x-decorator': 'TableV2.Column.Decorator',
        'properties': {},
        'title': title,
        'x-component-props': {
          'title': title
        }
      })
      // dn.emit('patch', {
      //   schema: {
      //     'x-uid': xUid,
      //     'properties': Object.assign({}, schema.properties, {
      //       [id]: {
      //         'name': id,
      //         'type': 'void',
      //         'x-uid': id,
      //         'x-component': 'TableV2.ColumnGroup',
      //         'x-decorator': 'TableV2.Column.Decorator',
      //         'properties': {},
      //         'x-component-props': {
      //           'title': title
      //         }
      //       }
      //     })
      //   }
      // })
      dn.refresh()
      setIsOpen(false)
    }} onCancel={() => setIsOpen(false)}>
      <Input value={title} onChange={e => setTitle(e.target.value)}></Input>
    </Modal>
  </div>
}
