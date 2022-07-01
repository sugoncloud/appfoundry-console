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
import { Link } from 'react-router-dom'

import { ICON_TYPES } from 'utils/constants'

import { Icon } from '@kube-design/components'
import { Status } from 'components/Base'

import styles from './index.scss'

const Item = ({ prefix = '', data = {} }) => {
  const { node_name, node_ip, isOnline, hasLeader, leaderChanges } = data
  const isExternal = !node_name
  const type = isOnline ? 'running' : 'error'

  return (
    <div key={node_ip} className={styles.item}>
      <div className={styles.icon}>
        <Icon name={ICON_TYPES['etcd']} size={40} />
        <Status className={styles.status} type={type} />
      </div>
      <div className={styles.info}>
        <p>
          <strong>
            {isExternal ? (
              t('External ETCD')
            ) : (
              <Link to={`${prefix}/${node_name}`}>{node_name}</Link>
            )}
          </strong>
          <span>
            {t('Node IP')}: {node_ip || '-'}
          </span>
        </p>
        <p>
          <strong>{hasLeader ? t('Yes') : t('No')}</strong>
          <span>{t('ETCD_LEADER_TITLE')}</span>
        </p>
        <p>
          <strong>{leaderChanges}</strong>
          <span>{t('ETCD_CHANGES_TITLE')}</span>
        </p>
      </div>
    </div>
  )
}

export default Item
