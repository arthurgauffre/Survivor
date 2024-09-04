
import React from 'react'
import SpawnHeadband from '../../component/SpawnHeadband'


export default function Page({ params }: { params: { id: string } }) {
  return (<SpawnHeadband title={params.id}>
      tkt
    </SpawnHeadband>)
}
