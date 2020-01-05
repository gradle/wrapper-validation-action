// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITAPPLY_H
#define GITAPPLY_H
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

#include "../include/repository.h"
#include "../include/diff.h"
#include "../include/apply_options.h"
#include "../include/index.h"
#include "../include/tree.h"

using namespace node;
using namespace v8;


class GitApply : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

              

  private:
              
    static NAN_METHOD(Apply);

    struct ToTreeBaton {
      int error_code;
      const git_error* error;
      git_index * out;
      git_repository * repo;
      git_tree * preimage;
      git_diff * diff;
      const git_apply_options * options;
    };
    class ToTreeWorker : public Nan::AsyncWorker {
      public:
        ToTreeWorker(
            ToTreeBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ToTreeWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ToTreeBaton *baton;
    };

    static NAN_METHOD(ToTree);
};

#endif
