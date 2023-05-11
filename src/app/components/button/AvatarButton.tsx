import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import message from 'antd/es/message';
import Upload from 'antd/es/upload/Upload';
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const getBase64 = (img: RcFile, callback: (url: any) => void) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    callback(reader.result);
  };
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface IAvatarButtonProps {
  name: string;
  label?: string | ReactNode;
  algin?: 'start' | 'center';
}

const AvatarButton: FC<IAvatarButtonProps> = ({ name, label, algin }) => {
  const { setValue } = useFormContext();
  const [loading, setLoading] = useState(false);

  const imageURL = useWatch({ name });

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setValue(name, url);
    });
  };

  const uploadButton = loading ? <LoadingOutlined /> : <PlusOutlined />;

  return (
    <>
      <Upload
        name="avatar"
        maxCount={1}
        listType="picture-circle"
        className={clsx(
          'avatar-uploader d-flex align-items-center',
          [algin === ('start' as const) && 'justify-content-start'],
          [algin === ('center' as const) && 'justify-content-center']
        )}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        <div
          style={{ borderRadius: '100%', overflow: 'hidden', display: 'grid', placeItems: 'center' }}
          className="w-100 h-100">
          {imageURL ? (
            <img
              src={imageURL}
              alt="avatar"
              className="w-100 h-100 object-fit-contain"
              style={{ objectPosition: 'center' }}
            />
          ) : (
            uploadButton
          )}
        </div>
      </Upload>
      <label className="form-label fw-bolder text-dark fs-6">{label}</label>
    </>
  );
};

AvatarButton.defaultProps = {
  name: '',
  label: '',
  algin: 'center',
};

export default AvatarButton;
