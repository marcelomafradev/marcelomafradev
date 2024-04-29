import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface ImageBannerDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  image: string;
}

const ImageBannerDialog = ({
  open,
  setOpen,
  title,
  image,
}: ImageBannerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="md:h-[80vh] md:w-[80vw] md:max-w-full">
        <DialogHeader>
          <DialogTitle>{title} - Banner</DialogTitle>
        </DialogHeader>

        <Image
          src={image}
          alt={`${title} banner`}
          className={'max-h-[70vh] w-full rounded-xl object-fill'}
          layout="responsive"
          width={500}
          height={300}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageBannerDialog;
