/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  Columns,
  Column,
  Input,
  TextArea,
  RadioGroup,
  Radio,
} from '@kube-design/components'

import { PIPELINE_PARAMS_TYPES } from 'utils/constants'

import styles from './index.scss'

export default class ParamsInput extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    onChange() {},
    onDelete() {},
  }

  renderFormItems(type) {
    let content = null

    switch (type) {
      case 'string':
        content = this.renderStringFormItems()
        break
      case 'text':
        content = this.renderTextFormItems()
        break
      case 'boolean':
        content = this.renderBooleanFormItems()
        break
      case 'choice':
        content = this.renderChoiceFormItems()
        break
      case 'password':
        content = this.renderPasswordFormItems()
        break
      default:
        break
    }

    return content
  }

  renderStringFormItems() {
    const { value } = this.props

    return (
      <div>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Input
                name={`${this.props.prefix}.name`}
                defaultValue={value.name}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Default Value')}
              desc={t(
                'It specifies the default value of the field, allowing the user to save the typed actual value.'
              )}
            >
              <Input
                name={`${this.props.prefix}.default_value`}
                defaultValue={value.default_value || ''}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item label={t('Description')} desc={t('Comment information')}>
          <TextArea
            className="max-width-full"
            name={`${this.props.prefix}.description`}
            defaultValue={value.description}
          />
        </Form.Item>
      </div>
    )
  }

  renderTextFormItems() {
    const { value } = this.props

    return (
      <div>
        <Form.Item
          label={t('Name')}
          rules={[{ required: true, message: t('This param is required') }]}
        >
          <Input name={`${this.props.prefix}.name`} defaultValue={value.name} />
        </Form.Item>
        <Form.Item label={t('Default Value')}>
          <TextArea
            className="max-width-full"
            name={`${this.props.prefix}.default_value`}
            defaultValue={value.default_value || ''}
          />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('Comment information')}>
          <TextArea
            className="max-width-full"
            name={`${this.props.prefix}.description`}
            defaultValue={value.description}
          />
        </Form.Item>
      </div>
    )
  }

  renderBooleanFormItems() {
    const { value } = this.props

    return (
      <div>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Input
                name={`${this.props.prefix}.name`}
                defaultValue={value.name}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Default Value')}>
              <RadioGroup
                name={`${this.props.prefix}.default_value`}
                defaultValue={JSON.parse(value.default_value || 'true')}
              >
                <Radio value={'true'}>True</Radio>
                <Radio value={'false'}>False</Radio>
              </RadioGroup>
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item label={t('Description')} desc={t('Comment information')}>
          <TextArea
            className="max-width-full"
            name={`${this.props.prefix}.description`}
            defaultValue={value.description}
          />
        </Form.Item>
      </div>
    )
  }

  renderChoiceFormItems() {
    const { value } = this.props

    return (
      <div>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Input
                name={`${this.props.prefix}.name`}
                defaultValue={value.name}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Options')}
              desc={t(
                'Alternate options, one per line. The first line will be used as the default option.'
              )}
            >
              <TextArea
                className="max-width-full"
                name={`${this.props.prefix}.default_value`}
                defaultValue={value.choice}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item label={t('Description')} desc={t('Comment information')}>
          <TextArea
            className="max-width-full"
            name={`${this.props.prefix}.description`}
            defaultValue={value.description}
          />
        </Form.Item>
      </div>
    )
  }

  renderPasswordFormItems() {
    const { value } = this.props

    return (
      <div>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Input
                name={`${this.props.prefix}.name`}
                defaultValue={value.name}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Password')}>
              <Input
                name={`${this.props.prefix}.default_value`}
                type="password"
                defaultValue={value.default_value || ''}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item label={t('Description')} desc={t('Comment information')}>
          <TextArea
            name={`${this.props.prefix}.description`}
            defaultValue={value.description}
          />
        </Form.Item>
      </div>
    )
  }

  render() {
    const { value, onDelete } = this.props

    return (
      <div className={styles.itemWrapper}>
        <div className={styles.itemTitle}>
          <p>
            <strong>{t(PIPELINE_PARAMS_TYPES[value.type])}</strong>
          </p>
          <Button
            className={styles.delete}
            type="flat"
            icon="trash"
            onClick={onDelete}
          />
        </div>
        {value.type && this.renderFormItems(value.type)}
      </div>
    )
  }
}
