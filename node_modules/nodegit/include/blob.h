// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITBLOB_H
#define GITBLOB_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/wrapper.h"
#include "node_buffer.h"
#include "../include/oid.h"
#include "../include/repository.h"
#include "../include/buf.h"
#include "../include/blob_filter_options.h"
// Forward declaration.
struct git_blob {
};

using namespace node;
using namespace v8;

class GitBlob;

struct GitBlobTraits {
  typedef GitBlob cppClass;
  typedef git_blob cType;

  static const bool isDuplicable = false;
  static void duplicate(git_blob **dest, git_blob *src) {
     Nan::ThrowError("duplicate called on GitBlob which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_blob *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_blob_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitBlob : public
  NodeGitWrapper<GitBlobTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitBlobTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                           

  private:
    GitBlob()
      : NodeGitWrapper<GitBlobTraits>(
           "A new GitBlob cannot be instantiated."
       )
    {}
    GitBlob(git_blob *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitBlobTraits>(raw, selfFreeing, owner)
    {}
    ~GitBlob();
                                                           
    struct CreateFromBufferBaton {
      int error_code;
      const git_error* error;
      git_oid * id;
      git_repository * repo;
      const void * buffer;
      size_t len;
    };
    class CreateFromBufferWorker : public Nan::AsyncWorker {
      public:
        CreateFromBufferWorker(
            CreateFromBufferBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromBufferWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromBufferBaton *baton;
    };

    static NAN_METHOD(CreateFromBuffer);

    struct CreateFromDiskBaton {
      int error_code;
      const git_error* error;
      git_oid * id;
      git_repository * repo;
      const char * path;
    };
    class CreateFromDiskWorker : public Nan::AsyncWorker {
      public:
        CreateFromDiskWorker(
            CreateFromDiskBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromDiskWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromDiskBaton *baton;
    };

    static NAN_METHOD(CreateFromDisk);

    struct CreateFromWorkdirBaton {
      int error_code;
      const git_error* error;
      git_oid * id;
      git_repository * repo;
      const char * relative_path;
    };
    class CreateFromWorkdirWorker : public Nan::AsyncWorker {
      public:
        CreateFromWorkdirWorker(
            CreateFromWorkdirBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromWorkdirWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromWorkdirBaton *baton;
    };

    static NAN_METHOD(CreateFromWorkdir);

    struct DupBaton {
      int error_code;
      const git_error* error;
      git_blob * out;
      git_blob * source;
    };
    class DupWorker : public Nan::AsyncWorker {
      public:
        DupWorker(
            DupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~DupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        DupBaton *baton;
    };

    static NAN_METHOD(Dup);

    struct FilterBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      git_blob * blob;
      const char * as_path;
      git_blob_filter_options * opts;
    };
    class FilterWorker : public Nan::AsyncWorker {
      public:
        FilterWorker(
            FilterBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FilterWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FilterBaton *baton;
    };

    static NAN_METHOD(Filter);

    struct FilteredContentBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      git_blob * blob;
      const char * as_path;
      int check_for_binary_data;
    };
    class FilteredContentWorker : public Nan::AsyncWorker {
      public:
        FilteredContentWorker(
            FilteredContentBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FilteredContentWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FilteredContentBaton *baton;
    };

    static NAN_METHOD(FilteredContent);

    static NAN_METHOD(Id);

    static NAN_METHOD(IsBinary);

    struct LookupBaton {
      int error_code;
      const git_error* error;
      git_blob * blob;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
    };
    class LookupWorker : public Nan::AsyncWorker {
      public:
        LookupWorker(
            LookupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LookupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LookupBaton *baton;
    };

    static NAN_METHOD(Lookup);

    struct LookupPrefixBaton {
      int error_code;
      const git_error* error;
      git_blob * blob;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
      size_t len;
    };
    class LookupPrefixWorker : public Nan::AsyncWorker {
      public:
        LookupPrefixWorker(
            LookupPrefixBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LookupPrefixWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LookupPrefixBaton *baton;
    };

    static NAN_METHOD(LookupPrefix);

    static NAN_METHOD(Owner);

    static NAN_METHOD(Rawcontent);

    static NAN_METHOD(Rawsize);
};

#endif
