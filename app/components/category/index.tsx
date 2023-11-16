import type { FC } from 'react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/app/components/base/button'
import Modal from '@/app/components/base/modal'
import knowledgeLibs from '@/libs/knowledge'
import type { IKnowledgeItem } from '@/types/app'
import { setCurrAppInfo } from '@/utils/appInfo'

export type ICategoryProps = {
  onSelect?: (e: IKnowledgeItem) => void
}

setCurrAppInfo(knowledgeLibs[0])

const Main: FC<ICategoryProps> = ({
  onSelect,
}) => {
  const { t } = useTranslation()
  const [modelVisible, setModelVisible] = useState(false)
  const [label, setLabel] = useState(knowledgeLibs[0].appName)
  return (
    <>
      <Button
        onClick={() => { setModelVisible(true) }}
        className="group block w-full flex-shrink-0 !justify-start !h-9 text-primary-600 items-center text-sm">
        {label}
      </Button>
      <Modal
        title="选择一个知识库开始吧~"
        isOpen={modelVisible}
        close={() => setModelVisible(false)}
      >
        <div className="flex flex-wrap mt-6 ">
          {knowledgeLibs.map((v) => {
            return (
              <button className="btn btn-sm ms-2 my-2" key={v.appId} onClick={() => {
                setLabel(v.appName)
                setModelVisible(false)
                setCurrAppInfo(v)
                onSelect?.(v)
              }}>{v.appName}</button>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

export default React.memo(Main)
