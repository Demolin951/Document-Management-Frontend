Пошаговый план реализации

Фаза 1 — Modal skeleton

Добавить:
src/components/ui/modal/Modal.tsx
src/components/ui/modal/modalTypes.ts

Изменить:
src/components/layout/Topbar.tsx

Результат:
По клику на "+ Upload Document" открывается пустое модальное окно.
Фон затемняется.
Окно по центру.
Закрывается по backdrop или Cancel/Close.

Почему начинаем с этого:
Сначала проверяем базовое поведение popup.
Не смешиваем сразу UI, drag & drop и API.

Фаза 2 — Upload modal UI

Добавить:
src/features/documents/components/UploadDocumentModal.tsx
src/features/documents/components/UploadDocumentDropzone.tsx
src/features/documents/types/documentUploadTypes.ts
src/features/documents/config/documentUploadConfig.ts

Изменить:
src/components/layout/Topbar.tsx

Результат:
Модалка визуально похожа на макет:

- dashed border
- cloud/upload icon
- Drag and drop your file here
- or
- Choose File

На этом этапе файл можно выбрать, но ещё не отправлять.

Фаза 3 — File validation

Добавить:
src/features/documents/utils/documentUploadUtils.ts

Внутри:
validateUploadFile
isPdfFile
isFileSizeAllowed

Изменить:
UploadDocumentDropzone.tsx
useUploadDocument.ts
Результат:
Можно выбрать только PDF.
При ошибке показываем понятный текст.

Почему:
Backend ожидает документы, у нас проект про PDF.
Лучше отфильтровать неверный файл до отправки.

Фаза 4 — Upload API

Добавить:
src/features/documents/api/documentUploadApi.ts
src/features/documents/hooks/useUploadDocument.ts
Backend contract:
POST /api/document
FormData:
File -> выбранный файл
UserName -> selectedUser.name

Результат:
Кнопка Upload отправляет файл в backend.
Во время загрузки показываем loading.
При ошибке показываем error.
При успехе закрываем modal.

Фаза 5 — Refresh documents table after upload

Добавить:
src/features/documents/store/useDocumentRefreshStore.ts
src/features/documents/types/documentRefreshTypes.ts

Изменить:
src/features/documents/hooks/useDocuments.ts
src/features/documents/components/DocumentTable.tsx
src/features/documents/hooks/useUploadDocument.ts

Результат:
После успешной загрузки documents table сама обновляется.
Новый документ появляется без ручного reload страницы.
