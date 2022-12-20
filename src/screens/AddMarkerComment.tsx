import {string, z} from 'zod';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@apollo/client';
import {mutationCreateComments} from './ViewMarker/queries/mutationCreateComments'
import { Box, Button, CheckIcon, Column, FormControl, Input, ScrollView, Select, Stack, TextArea, useToast } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';


const texts = {
    commentLabel: 'Comentário',
    submitButton: 'Enviar',
    errorToast: 'Houve um erro ao criar o comentário',
    successToast: 'Comentário criado com sucesso',
    titleLabel: 'Título'
};
const errorMessages = {
    required(field: string) {
      return `O campo "${field}" é obrigatório.`;
    },
    min(field: string, length: number) {
      return `O campo "${field}" precisa ter pelo menos ${length} letras.`;
    },
    max(field: string, length: number) {
      return `O campo "${field}" pode ter no máximo até ${length} letras.`;
    },
};
const messageMinLength = 16;
const messageMaxLength = 140;  
const commentFieldName = texts.commentLabel.toLowerCase();
const titleFieldName = texts.titleLabel.toLowerCase();


const createCommentSchema = z
  .object({
    comment: z
      .string({
        required_error: errorMessages.required(commentFieldName),
      })
      .min(messageMinLength, {
        message: errorMessages.min(commentFieldName, messageMinLength),
      })
      .max(messageMaxLength, {
        message: errorMessages.max(commentFieldName, messageMaxLength),
      }),
    title: z
      .string({
        required_error: errorMessages.required(titleFieldName),
      })
  })
  .transform(form => ({
    ...form,
    comment: form.comment.trim().replace(/\s\s+/g, ' '),
    title: form.title.trim().replace(/\s\s+/g, ' '),
  }));

type CreateCommentSchema = z.infer<typeof createCommentSchema>;  

export function AddMarkerComment(){

    const {params} = useRoute()
    console.log(params)

    const toast = useToast();
    const navigation = useNavigation();

    const [createComment, {loading}] = useMutation(mutationCreateComments);
    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm<CreateCommentSchema>({
        resolver: zodResolver(createCommentSchema),
      });


      async function onSubmit({comment, title}: CreateCommentSchema) {
        const {errors} = await createComment({
          variables: {
            comment: comment,
            title: title,
            markerUid: params?.id
          },
        });
    
        if (errors) {
          toast.show({
            description: texts.errorToast,
            backgroundColor: 'error.500',
          });
        } else {
          toast.show({
            description: texts.successToast,
            backgroundColor: 'success.500',
          });
          navigation.goBack();
        }
      }
      

    return (
    <ScrollView>
        <Box height="full" margin="4">
            <FormControl isRequired isInvalid={'title' in errors}>
                <FormControl.Label isRequired>
                    {texts.titleLabel}
                </FormControl.Label>
                <Controller
                    name="title"
                    control={control}
                    render={({field: {value, onBlur, onChange}}) => (
                        <Input
                            type="text"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            isDisabled={loading}
                        />
                    )}
                />
                <FormControl.ErrorMessage>
                    {errors.title?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'comment' in errors}>
                <FormControl.Label isRequired>
                    {texts.commentLabel}
                </FormControl.Label>
                <Controller
                    name="comment"
                    control={control}
                    render={({field: {value, onBlur, onChange}}) => (
                        <TextArea
                            numberOfLines={5}
                            type="text"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            isDisabled={loading}
                        />
                    )}
                />
                <FormControl.ErrorMessage>
                    {errors.comment?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            
            <Button
                marginTop="4"
                onPress={handleSubmit(onSubmit)}
                isDisabled={loading}
                isLoading={loading}>
                {texts.submitButton}
            </Button>
        </Box>
    </ScrollView>
    )
}