import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface NewImageData {
  title: string;
  description: string;
  url: string;
}

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const imageFormat = /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g;

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS - OK
      required: "Arquivo Obrigatório.",
      validate: {
        lessThan10MB: file => file[0].size < 10000000 || "O arquivo deve ser menor que 10MB.",
        acceptedFormats: file => imageFormat.test(file[0].type) || "Somente são aceitos arquivos PNG, JPEG e GIF."
      }
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS - OK
      required: "Título obrigatório.",
      minLength: {
        value: 2,
        message: "Mínimo de 2 caracteres.",
      },
      maxLength: {
        value: 20,
        message: "Máximo de 20 caracteres",
      },
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS - OK
      required: "Descrição obrigatória.",
      maxLength: {
        value: 65,
        message: "Máximo de 65 caracteres",
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(async (image: NewImageData) => {
    // TODO MUTATION API POST REQUEST - OK
    await api.post('/api/images', {
      ...image,
      url: imageUrl,
    })
    },
    {
      // TODO ONSUCCESS MUTATION - OK
      onSuccess: () => {
        queryClient.invalidateQueries("images")
      }
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: NewImageData): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS - OK
      if (!imageUrl) {
        toast({
          status: "error",
          title: "Imagem não adicionada!",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro."
        })
        return;
      }
      // TODO EXECUTE ASYNC MUTATION - OK
      await mutation.mutateAsync(data)
      // TODO SHOW SUCCESS TOAST - OK
      toast({
        status: "success",
        title: "Imagem cadastrada!",
        description: "Sua imagem foi cadastrada com sucesso."
      })
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED - OK
      toast({
        status: "error",
        title: "Falha no cadastro.",
        description: "Ocorreu um erro ao tentar cadastrar a sua image."
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL - OK
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO SEND IMAGE ERRORS - OK
          error={errors.image}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS - OK
          {...register("image", formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS - OK
          error={errors.title}
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS - OK
          {...register("title", formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS - OK
          error={errors.description}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS - OK
          {...register("description", formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
